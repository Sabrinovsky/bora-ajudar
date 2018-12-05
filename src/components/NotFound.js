import React from 'react'

const NotFound = props =>{
    return(
      
            <section className="page-section about-heading">
                <div className="container">
                    <img className="img-fluid rounded about-heading-img mb-3 mb-lg-0" src="img/about-menor.jpg" alt=""/>
                    <div className="about-heading-content">
                    <div className="row">
                        <div className="col-xl-9 col-lg-10 mx-auto">
                        <div className="bg-faded rounded p-5">
                            <h2 className="section-heading mb-4">
                            <span className="section-heading-upper">Ooops i did it again</span>
                            <span className="section-heading-lower">Página não encontrada</span>
                            </h2>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        
    )
}
export default NotFound