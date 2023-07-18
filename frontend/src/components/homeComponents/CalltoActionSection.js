import React from "react";

const CalltoActionSection = () => {
  return (
    // <div className="subscribe-section bg-with-black">
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-xs-12">
    //         <div className="subscribe-head">
    //           <h2>Want To Do Business Which Us?</h2>
    //           <p>Sign up to sell on our plateform today.</p>
    //           <form className="form-section">
    //             <input placeholder="Your Email..." name="email" type="email" />
    //             <input value="Yes. I want!" name="subscribe" type="submit" />
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="pc-header">
        <div className="subscribe-section bg-with-black">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="subscribe-head">
                  <h2>Want To Do Business Which Us?</h2>
                  <p>Sign up to sell on our plateform today.</p>
                  <form className="form-section">
                    <input
                      placeholder="Your Email..."
                      name="email"
                      type="email"
                    />
                    <input
                      value="Yes. I want!"
                      name="subscribe"
                      type="submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-header">
        <div className="subscribe-section bg-with-black">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="subscribe-head">
                  <h2>Want To Do Business Which Us?</h2>
                  <p>Sign up to sell on our plateform today.</p>
                  <form className="mobile-form-section">
                    <input
                      placeholder="   Your Email..."
                      name="email"
                      type="email"
                    />
                    <input value="Yes!" name="subscribe" type="submit" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalltoActionSection;
