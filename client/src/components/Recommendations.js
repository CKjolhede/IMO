import React from "react";   
import RecCard from "./RecCard";
import { useRec } from "../contexts/RecContext";   
        
function Recommendations() {
        const { recommendations } = useRec();
        console.log("in Recommendations.js", recommendations);
        return (
                <>
                <h1>Recommendations</h1>
                <div className="Reclist">     
                        {recommendations.map((recommendation) => (<RecCard key={recommendation.id}
                        recommendation = {recommendation}/>
                        ))}
                </div>
                </>
        );
}
export default Recommendations;



