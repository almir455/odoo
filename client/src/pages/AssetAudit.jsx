import { useState } from "react";


function AssetAudit() {


  const [auditCycles,setAuditCycles] = useState([]);

  const [assets,setAssets] = useState([]);



  const [audit,setAudit] = useState({

    scope:"",
    date:"",
    auditor:""

  });



  const [asset,setAsset] = useState({

    tag:"",
    name:"",
    department:""

  });




  const createAudit = ()=>{


    setAuditCycles([

      ...auditCycles,

      {

        id:auditCycles.length+1,

        scope:audit.scope,

        dateRange:audit.date,

        auditors:audit.auditor,

        status:"Open"

      }

    ]);



  };





  const addAsset = ()=>{


    setAssets([

      ...assets,

      {

        ...asset,

        auditStatus:"Pending"

      }

    ]);



  };





  const updateAuditStatus=(index,status)=>{


    const updated=[...assets];


    updated[index].auditStatus=status;


    setAssets(updated);


  };






  const closeAudit=()=>{


    const updated=assets.map(item=>{


      if(item.auditStatus==="Missing"){

        return{

          ...item,

          auditStatus:"Lost"

        };

      }


      return item;


    });


    setAssets(updated);


  };





  return (

    <div style={{padding:"30px"}}>


      <h1>
        Asset Audit Screen
      </h1>





      {/* Create Audit Cycle */}



      <h2>
        Create Audit Cycle
      </h2>



      <input

        placeholder="Department / Location Scope"

        onChange={(e)=>setAudit({

          ...audit,

          scope:e.target.value

        })}

      />



      <br/><br/>



      <input

        placeholder="Date Range"

        onChange={(e)=>setAudit({

          ...audit,

          date:e.target.value

        })}

      />



      <br/><br/>




      <input

        placeholder="Auditor Name"

        onChange={(e)=>setAudit({

          ...audit,

          auditor:e.target.value

        })}

      />



      <br/><br/>



      <button onClick={createAudit}>

        Create Audit Cycle

      </button>




      <hr/>





      {/* Add Assets */}



      <h2>
        Add Asset For Audit
      </h2>



      <input

        placeholder="Asset Tag"

        onChange={(e)=>setAsset({

          ...asset,

          tag:e.target.value

        })}

      />



      <input

        placeholder="Asset Name"

        onChange={(e)=>setAsset({

          ...asset,

          name:e.target.value

        })}

      />



      <input

        placeholder="Department"

        onChange={(e)=>setAsset({

          ...asset,

          department:e.target.value

        })}

      />



      <button onClick={addAsset}>

        Add Asset

      </button>






      <hr/>





      {/* Verification */}



      <h2>
        Asset Verification
      </h2>




      <table border="1" cellPadding="10">


        <thead>

          <tr>

            <th>Asset Tag</th>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>




        <tbody>


        {

          assets.map((item,index)=>(


            <tr key={index}>


              <td>{item.tag}</td>

              <td>{item.name}</td>

              <td>{item.department}</td>

              <td>{item.auditStatus}</td>



              <td>


                <button

                  onClick={()=>updateAuditStatus(index,"Verified")}

                >

                  Verified

                </button>



                <button

                  onClick={()=>updateAuditStatus(index,"Missing")}

                >

                  Missing

                </button>



                <button

                  onClick={()=>updateAuditStatus(index,"Damaged")}

                >

                  Damaged

                </button>


              </td>


            </tr>


          ))

        }


        </tbody>


      </table>






      <hr/>





      {/* Discrepancy Report */}



      <h2>
        Discrepancy Report
      </h2>




      <ul>


      {

        assets

        .filter(item=>

          item.auditStatus==="Missing" ||

          item.auditStatus==="Damaged"

        )

        .map((item,index)=>(

          <li key={index}>

            {item.tag} - {item.name} : {item.auditStatus}

          </li>

        ))

      }


      </ul>





      <button onClick={closeAudit}>

        Close Audit Cycle

      </button>





      <hr/>





      {/* History */}



      <h2>
        Audit History
      </h2>



      <table border="1" cellPadding="10">


        <tbody>


        {

          auditCycles.map((cycle,index)=>(


            <tr key={index}>

              <td>
                Cycle {cycle.id}
              </td>

              <td>
                {cycle.scope}
              </td>

              <td>
                {cycle.dateRange}
              </td>

              <td>
                {cycle.auditors}
              </td>

              <td>
                {cycle.status}
              </td>

            </tr>


          ))

        }


        </tbody>


      </table>




    </div>

  );

}


export default AssetAudit;