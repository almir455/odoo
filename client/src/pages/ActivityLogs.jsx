import { useState } from "react";


function ActivityLogs() {


  const [notifications,setNotifications] = useState([]);


  const [logs,setLogs] = useState([]);



  const [notification,setNotification] = useState({

    type:"",
    message:"",
    time:"",
    status:"Unread"

  });



  const [log,setLog] = useState({

    user:"",
    action:"",
    module:"",
    time:""

  });





  const addNotification = ()=>{

    setNotifications([

      ...notifications,

      {
        ...notification,
        id:Date.now()
      }

    ]);

  };





  const addLog = ()=>{


    setLogs([

      ...logs,

      log

    ]);


  };





  const markRead=(id)=>{


    setNotifications(

      notifications.map(item=>

        item.id===id

        ?

        {
          ...item,
          status:"Read"
        }

        :

        item

      )

    );


  };





  return (

    <div style={{padding:"30px"}}>


      <h1>
        Activity Logs & Notifications
      </h1>



      {/* Notification Input */}



      <h2>Create Notification</h2>


      <input
        placeholder="Notification Type"
        onChange={(e)=>setNotification({

          ...notification,

          type:e.target.value

        })}
      />



      <input
        placeholder="Message"
        onChange={(e)=>setNotification({

          ...notification,

          message:e.target.value

        })}
      />



      <input
        placeholder="Time"
        onChange={(e)=>setNotification({

          ...notification,

          time:e.target.value

        })}
      />



      <button onClick={addNotification}>
        Add Notification
      </button>





      <hr/>




      <h2>
        Notifications
      </h2>



      <table border="1" cellPadding="10">

        <thead>

          <tr>

            <th>Type</th>
            <th>Message</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>



        <tbody>


        {

          notifications.map(item=>(

            <tr key={item.id}>

              <td>{item.type}</td>

              <td>{item.message}</td>

              <td>{item.time}</td>

              <td>{item.status}</td>


              <td>

                {
                  item.status==="Unread" &&

                  <button
                    onClick={()=>markRead(item.id)}
                  >

                    Mark Read

                  </button>

                }

              </td>


            </tr>

          ))

        }


        </tbody>


      </table>





      <hr/>





      {/* Activity Log Input */}



      <h2>
        Add Activity Log
      </h2>



      <input
        placeholder="User Name"
        onChange={(e)=>setLog({

          ...log,

          user:e.target.value

        })}
      />



      <input
        placeholder="Action Performed"
        onChange={(e)=>setLog({

          ...log,

          action:e.target.value

        })}
      />



      <input
        placeholder="Module"
        onChange={(e)=>setLog({

          ...log,

          module:e.target.value

        })}
      />



      <input
        placeholder="Date & Time"
        onChange={(e)=>setLog({

          ...log,

          time:e.target.value

        })}
      />



      <button onClick={addLog}>
        Add Log
      </button>





      <hr/>




      <h2>
        Full Activity Audit Log
      </h2>




      <table border="1" cellPadding="10">


        <thead>

          <tr>

            <th>User</th>
            <th>Action</th>
            <th>Module</th>
            <th>Date & Time</th>

          </tr>


        </thead>



        <tbody>


        {

          logs.map((item,index)=>(


            <tr key={index}>

              <td>{item.user}</td>

              <td>{item.action}</td>

              <td>{item.module}</td>

              <td>{item.time}</td>


            </tr>


          ))

        }


        </tbody>


      </table>



    </div>

  );

}


export default ActivityLogs;