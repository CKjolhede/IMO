import React from 'react';

const base_url = "./";
    const images  = [
        'images/1.png',
        'images/2.png',
        'images/3.png',
        'images/4.png',
        'images/5.png',
        'images/6.png',
        'images/7.png',
        'images/8.png',
        'images/9.png',
        'images/10.png',
        'images/11.png',
        'images/12.png',
        'images/13.png',
        'images/14.png',
        'images/15.png',
        'images/16.png',
        'images/17.png',
        'images/18.png',
        'images/19.png',
        'images/20.png',
        'images/21.png',
        'images/22.png'
    ];
    
const Modal = ({ onSelectImage }) => {
    return (
        <div className="modal">
            <h2>Select an Avatar</h2>
            <div className="image-list">
                {images?.map((image, index) => (
                    <figure key={index}>
                        <img
                            src={base_url + image}
                            alt={`Avatar ${index}`}
                            onClick={() => onSelectImage(image)}
                            style={{ cursor: "pointer" }}
                        />
                        <figcaption>Avatar {index}</figcaption>
                    </figure>
                ))}
            </div>
        </div>
    );
};

export default Modal;
;