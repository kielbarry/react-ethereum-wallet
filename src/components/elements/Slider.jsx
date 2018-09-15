import React from 'react';

export const Slider = ({ field }) => {
    console.log(this.props);

    return (
        <div className="row clear">
            <div className="col col-7 mobile-full">
                <h3>Select Fee</h3>

                <div className="dapp-select-gas-price">
                    <span>
                        0.000106 <span>ETHER</span>
                    </span>
                    <br />
                    <input type="range" name="fee" min="-4" max="1" step="1" />
                    <span>Cheaper</span>
                    <span>Faster</span>
                </div>
            </div>

            <div className="col col-5 mobile-full send-info">
                <br />
                <br />
                This is the most amount of money that might be used to process
                this transaction. Your transaction will be mined
                <strong>probably within 30 seconds</strong>.
            </div>

            <div className="dapp-clear-fix" />
        </div>
    );
};

export default Slider;
