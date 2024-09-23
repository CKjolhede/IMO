import React from 'react';
import RecCard from './RecCard';

function RecFeed({ recommendations }) {
    const recs = recommendations.flat();
    return (
            <>
            <div className="Reclist">
                {recs?.map((recommendation) => <div >
                    <RecCard recommendation={recommendation} />
                </div>)
                }
            </div>
            </>
    );
}


export default RecFeed;
