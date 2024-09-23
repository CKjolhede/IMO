import React from "react";   
import RecCard from "./RecCard";
import { useRec } from "../contexts/RecContext";   
        
function Recommendations() {
        const { recommendations } = useRec();
        return (
                <>
                <div>     
                        {recommendations?.map((recommendation) => <div >
                                <RecCard  recommendation = {recommendation} />
                                </div>)
                        }       
                </div>
                </>
        );
}
export default Recommendations;



