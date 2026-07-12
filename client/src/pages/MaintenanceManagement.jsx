import { useState } from "react";


function MaintenanceManagement() {


  const [requests,setRequests] = useState([]);


  const [history,setHistory] = useState([]);



  const [request,setRequest] = useState({

    asset:"",
    issue:"",
    priority:"Medium",
    photo:""

  });





  const raiseRequest=()=>{


    const newRequest={

      ...request,

      status:"Pending",

      technician:"Not Assigned"

    };


    setRequests([

      ...requests,

      newRequest

    ]);



    setRequest({

      asset:"",
      issue:"",
      priority:"Medium",
      photo:""

    });


  };





  const updateStatus=(index,status)=>{


    const updated=[...requests];


    updated[index].status=status;


    setRequests(updated);



    if(status==="Resolved"){

      setHistory([

        ...history,

        updated[index]

      ]);

    }


  };






  return (

    <div style={{padding:"30px"}}>


      <h1>
        Maintenance Management
      </h1>



      <h2>
        Raise Maintenance Request
      </h2>




      <input

        placeholder="Asset Tag"

        value={request.asset}

        onChange={(e)=>setRequest({

          ...request,

          asset:e.target.value

        })}

      />



      <br/><br/>




      <textarea

        placeholder="Describe Issue"

        value={request.issue}

        onChange={(e)=>setRequest({

          ...request,

          issue:e.target.value

        })}

      />



      <br/><br/>




      <select

        value={request.priority}

        onChange={(e)=>setRequest({

          ...request,

          priority:e.target.value

        })}

      >

        <option>Low</option>
        <option>Medium</option>
        <option>High</option>

      </select>



      <br/><br/>




      <input

        type="file"

        onChange={(e)=>setRequest({

          ...request,

          photo:e.target.files[0]

        })}

      />



      <br/><br/>




      <button onClick={raiseRequest}>

        Submit Request

      </button>





      <hr/>





      <h2>
        Maintenance Requests
      </h2>



      <table border="1" cellPadding="10">


        <thead>

          <tr>

            <th>Asset</th>
            <th>Issue</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Technician</th>
            <th>Action</th>

          </tr>


        </thead>



        <tbody>


        {

          requests.map((item,index)=>(


            <tr key={index}>


              <td>{item.asset}</td>

              <td>{item.issue}</td>

              <td>{item.priority}</td>

              <td>{item.status}</td>

              <td>{item.technician}</td>



              <td>


              {

                item.status==="Pending" &&

                <button

                  onClick={()=>updateStatus(index,"Approved")}

                >

                                  Approve

                </button>

              }



              {

                item.status==="Approved" &&

                <button

                  onClick={()=>updateStatus(index,"Technician Assigned")}

                >

                  Assign Technician

                </button>

              }



              {

                item.status==="Technician Assigned" &&

                <button

                  onClick={()=>updateStatus(index,"In Progress")}

                >

                  Start Work

                </button>

              }



              {

                item.status==="In Progress" &&

                <button

                  onClick={()=>updateStatus(index,"Resolved")}

                >

                  Resolve

                </button>

              }



              </td>


            </tr>


          ))

        }


        </tbody>


      </table>






      <hr/>





      <h2>
        Workflow
      </h2>


      <p>

        Pending → Approved → Technician Assigned → In Progress → Resolved

      </p>






      <h2>
        Maintenance History
      </h2>



      <table border="1" cellPadding="10">


        <thead>

          <tr>

            <th>Asset</th>
            <th>Issue</th>
            <th>Priority</th>
            <th>Status</th>

          </tr>

        </thead>



        <tbody>


        {

          history.map((item,index)=>(


            <tr key={index}>


              <td>
                {item.asset}
              </td>


              <td>
                {item.issue}
              </td>


              <td>
                {item.priority}
              </td>


              <td>
                {item.status}
              </td>


            </tr>


          ))

        }


        </tbody>


      </table>




    </div>

  );

}


export default MaintenanceManagement;