import React from "react";   
import RecCard from "./RecCard";
import { useAuth } from "../contexts/AuthContext";
import { useRec } from "../contexts/RecContext";   
        
function Recommendations() {
        const { user } = useAuth();
        const { recommendations } = useRec();
        return (
                <>
                <div>     
                                {recommendations.filter(recommendation => recommendation.user.id === user.id)?.map((recommendation) => <div key={recommendation.id}>
                                <RecCard recommendation = {recommendation} />
                                </div>)
                        }       
                </div>
                </>
        );
}
export default Recommendations;



