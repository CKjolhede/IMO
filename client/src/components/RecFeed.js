import React from 'react';
import RecCard from './RecCard';

function RecFeed({ recommendations }) {
    const recs = recommendations.flat();
    if (!recs || recs.length === 0) {
        return <h1 className="userprofile-friendRecs" style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}>No friend recommendations found.</h1>;
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
