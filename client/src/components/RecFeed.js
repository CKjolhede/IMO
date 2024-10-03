import React from 'react';
import RecCard from './RecCard';

function RecFeed({ recommendations }) {
    const recs = recommendations.flat();
    if (!recs || recs.length === 0) {
        return <div>No recommendations found.</div>;
    }
    return (
            <>
            <div >
                {recs?.map((recommendation) => <div key={recommendation.id}>
                    <RecCard recommendation={recommendation} />
                </div>)
                }
            </div>
            </>
    );
}


export default RecFeed;
