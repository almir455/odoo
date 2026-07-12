import { useState } from "react";


function AssetAllocation() {


  const [allocations,setAllocations] = useState([]);


  const [newAllocation,setNewAllocation] = useState({

    assetTag:"",
    assetName:"",
    employee:"",
    department:"",
    returnDate:""

  });


  const [message,setMessage] = useState("");



  const allocateAsset = ()=>{


    const existingAsset = allocations.find(

      item=>item.assetTag===newAllocation.assetTag

    );



    if(existingAsset){


      setMessage(
        `Asset already allocated to ${existingAsset.holder}`
      );

      return;

    }



    setAllocations([

      ...allocations,

      {

        assetTag:newAllocation.assetTag,

        assetName:newAllocation.assetName,

        holder:newAllocation.employee,

        department:newAllocation.department,

        status:"Allocated",

        expectedReturn:newAllocation.returnDate

      }

    ]);



    setMessage("Asset allocated successfully");


    setNewAllocation({

      assetTag:"",
      assetName:"",
      employee:"",
      department:"",
      returnDate:""

    });


  };






  const returnAsset=(tag)=>{


    setAllocations(

      allocations.map(item=>

        item.assetTag===tag

        ?

        {

          ...item,

          status:"Available",

          holder:""

        }

        :

        item

      )

    );


  };





  return (

    <div style={{padding:"30px"}}>


      <h1>
        Asset Allocation & Transfer
      </h1>



      <h2>
        Allocate Asset
      </h2>



      <input

        placeholder="Asset Tag"

        value={newAllocation.assetTag}

        onChange={(e)=>setNewAllocation({

          ...newAllocation,

          assetTag:e.target.value

        })}

      />



      <br/><br/>



      <input

        placeholder="Asset Name"

        value={newAllocation.assetName}

        onChange={(e)=>setNewAllocation({

          ...newAllocation,

          assetName:e.target.value

        })}

      />



      <br/><br/>



      <input

        placeholder="Employee Name"

        value={newAllocation.employee}

        onChange={(e)=>setNewAllocation({

          ...newAllocation,

          employee:e.target.value

        })}

      />



      <br/><br/>



      <input

        placeholder="Department"

        value={newAllocation.department}

        onChange={(e)=>setNewAllocation({

          ...newAllocation,

          department:e.target.value

        })}

      />



      <br/><br/>



      <label>
        Expected Return Date:
      </label>


      <input

        type="date"

        value={newAllocation.returnDate}

        onChange={(e)=>setNewAllocation({

          ...newAllocation,

          returnDate:e.target.value

        })}

      />



      <br/><br/>



      <button onClick={allocateAsset}>

        Allocate Asset

      </button>



      <p>{message}</p>




      <hr/>




      <h2>
        Current Allocations
      </h2>




      <table border="1" cellPadding="10">


        <thead>

          <tr>

            <th>Asset Tag</th>
            <th>Asset Name</th>
            <th>Employee</th>
            <th>Department</th>
            <th>Status</th>
            <th>Return Date</th>
            <th>Action</th>

          </tr>


        </thead>



        <tbody>


        {

          allocations.map((item,index)=>(


            <tr key={index}>


              <td>{item.assetTag}</td>

              <td>{item.assetName}</td>

              <td>{item.holder}</td>

              <td>{item.department}</td>

              <td>{item.status}</td>

              <td>{item.expectedReturn}</td>


              <td>


                {
                  item.status==="Allocated" &&

                  <button

                    onClick={()=>returnAsset(item.assetTag)}

                  >

                    Return

                  </button>

                }


                <button>

                  Transfer Request

                </button>


              </td>


            </tr>


          ))

        }


        </tbody>


      </table>




      <hr/>




      <h2>
        Transfer Workflow
      </h2>


      <ol>

        <li>
          Employee requests transfer
        </li>

        <li>
          Asset Manager / Department Head approves
        </li>

        <li>
          Asset reallocated and history updated
        </li>

      </ol>



      <h2>
        Return Flow
      </h2>


      <ol>

        <li>
          Employee returns asset
        </li>

        <li>
          Condition check recorded
        </li>

        <li>
          Asset status changes to Available
        </li>

      </ol>



    </div>

  );

}


export default AssetAllocation;