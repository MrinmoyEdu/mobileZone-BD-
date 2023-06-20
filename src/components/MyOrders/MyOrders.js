import React, { useEffect, useState} from 'react';





const MyOrders = () => {

    const email = sessionStorage.getItem("email");
    const [services, setServices] = useState([]) ;
     const [constrol, setControl] = useState(false);

         useEffect( () =>{
             fetch(`https://modile-zone-bd-server.vercel.app/myOrders/${email}`)
             .then(res => res.json())
                 .then(data => setServices(data));

         }, [constrol]);

     const handleDelete = (id) => {
         
            alert("your product will delete")
       
            fetch(`https://modile-zone-bd-server.vercel.app/deleteOrder/${id}`, {
                method: "DELETE",

            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        setControl(!constrol);
                    }
                })
   
        
         
     };

    return (
        <div>
            <h1 className = 'text-center mt-5 fw-bold'> My Orders</h1>

            <div className='card-container container mt-lg-5 mt-3 pt-lg-5 pt-3'>
                <div className="row  row-cols-1 row-cols-md-3 g-4">
                  {
                      services.map(service =>(
                          <div key={service?._id} >
                              <div className="col h-100 card-style">
                                  <div className="card h-100">
                                      <img src={service?.imageLink} className="card-img-top" alt="" />
                                      <div className="card-body">
                                          <h5 className ='fw-bold'>Package:{service?.packageName}</h5>
                                          <h6 className =" fw-bold">Customers's name: {service?.name}</h6>
                                          
                                          <p >Order status:   <span className="text-primary">{service?.status}</span></p>
                                          <h4 className="line-color fw-bold mb-3">Cost: {service?.price}$ </h4>
                                          <button onClick={() => handleDelete(service?._id)} className="buying-btn w-100 py-2 text-white border rounded py-1 "><i className="far fa-window-close"></i> Cancel</button>

                                      </div>
                                  </div>
                              </div> </div>
                      ))
                  }

                </div>
            </div>




        </div>
    );
};

export default MyOrders;