import { useState } from "react";


function ReportsAnalytics() {


  const [reportType,setReportType] = useState("Asset Utilization");


  const [assets,setAssets] = useState([]);


  const [maintenance,setMaintenance] = useState([]);


  const [allocation,setAllocation] = useState([]);


  const [booking,setBooking] = useState([]);




  const [asset,setAsset] = useState({

    name:"",
    category:"",
    usage:"",
    status:""

  });



  const [maint,setMaint] = useState({

    category:"",
    repairs:""

  });



  const [alloc,setAlloc] = useState({

    department:"",
    count:""

  });



  const [book,setBook] = useState({

    time:"",
    usage:""

  });





  return (

    <div style={{padding:"30px"}}>


      <h1>
        Reports & Analytics
      </h1>




      <select

        onChange={(e)=>setReportType(e.target.value)}

      >

        <option>
          Asset Utilization
        </option>

        <option>
          Maintenance Analysis
        </option>

        <option>
          Department Allocation
        </option>

        <option>
          Resource Booking
        </option>


      </select>




      <hr/>





      {
        reportType==="Asset Utilization" &&

        <div>


        <h2>
          Add Asset Usage Data
        </h2>


        <input
          placeholder="Asset Name"
          onChange={(e)=>setAsset({
            ...asset,
            name:e.target.value
          })}
        />


        <input
          placeholder="Category"
          onChange={(e)=>setAsset({
            ...asset,
            category:e.target.value
          })}
        />


        <input
          placeholder="Usage %"
          onChange={(e)=>setAsset({
            ...asset,
            usage:e.target.value
          })}
        />


        <input
          placeholder="Status"
          onChange={(e)=>setAsset({
            ...asset,
            status:e.target.value
          })}
        />


        <button

          onClick={()=>setAssets([...assets,asset])}

        >
          Add Asset Report
        </button>




        <h2>
          Asset Utilization Trends
        </h2>



        <table border="1" cellPadding="10">

        <tbody>

        <tr>

        <th>Asset</th>
        <th>Category</th>
        <th>Usage</th>
        <th>Status</th>

        </tr>


        {
          assets.map((a,index)=>(

          <tr key={index}>

          <td>{a.name}</td>
          <td>{a.category}</td>
          <td>{a.usage}%</td>
          <td>{a.status}</td>

          </tr>

          ))
        }


        </tbody>

        </table>


        </div>

      }







      {
        reportType==="Maintenance Analysis" &&

        <div>


        <h2>
          Add Maintenance Data
        </h2>


        <input
        placeholder="Category"
        onChange={(e)=>setMaint({
          ...maint,
          category:e.target.value
        })}
        />


        <input
        placeholder="Number of Repairs"
        onChange={(e)=>setMaint({
          ...maint,
          repairs:e.target.value
        })}
        />


        <button

        onClick={()=>setMaintenance([
          ...maintenance,
          maint
        ])}

        >
          Add Maintenance
        </button>




        <table border="1" cellPadding="10">

        <tbody>


        <tr>

        <th>Category</th>
        <th>Repairs</th>

        </tr>



        {
          maintenance.map((m,index)=>(

          <tr key={index}>

          <td>{m.category}</td>
          <td>{m.repairs}</td>

          </tr>

          ))
        }


        </tbody>

        </table>


        </div>

      }







      {
        reportType==="Department Allocation" &&

        <div>


        <h2>
          Add Department Allocation
        </h2>


        <input

        placeholder="Department"

        onChange={(e)=>setAlloc({

          ...alloc,

          department:e.target.value

        })}

        />



        <input

        placeholder="Allocated Assets"

        onChange={(e)=>setAlloc({

          ...alloc,

          count:e.target.value

        })}

        />



        <button

        onClick={()=>setAllocation([

          ...allocation,

          alloc

        ])}

        >

        Add Allocation

        </button>





        <table border="1" cellPadding="10">

        <tbody>


        <tr>

        <th>Department</th>
        <th>Assets</th>

        </tr>



        {
          allocation.map((a,index)=>(

          <tr key={index}>

          <td>{a.department}</td>
          <td>{a.count}</td>

          </tr>

          ))
        }


        </tbody>

        </table>


        </div>

      }








      {
        reportType==="Resource Booking" &&

        <div>


        <h2>
          Add Booking Usage
        </h2>



        <input

        placeholder="Time Slot"

        onChange={(e)=>setBook({

          ...book,

          time:e.target.value

        })}

        />



        <input

        placeholder="Usage Level"

        onChange={(e)=>setBook({

          ...book,

          usage:e.target.value

        })}

        />



        <button

        onClick={()=>setBooking([

          ...booking,

          book

        ])}

        >

        Add Booking Data

        </button>





        <table border="1" cellPadding="10">

        <tbody>


        <tr>

        <th>Time</th>
        <th>Usage</th>

        </tr>



        {
          booking.map((b,index)=>(

          <tr key={index}>

          <td>{b.time}</td>
          <td>{b.usage}</td>

          </tr>

          ))
        }


        </tbody>

        </table>


        </div>

      }




      <hr/>


      <button

      onClick={()=>alert("Report Exported Successfully")}

      >

      Export Report

      </button>



    </div>

  );

}


export default ReportsAnalytics;