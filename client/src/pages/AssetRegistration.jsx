import { useState } from "react";

function AssetRegistration() {


  const [assets,setAssets] = useState([]);


  const [search,setSearch] = useState("");



  const [asset,setAsset] = useState({

    name:"",
    category:"",
    serial:"",
    date:"",
    cost:"",
    condition:"",
    location:"",
    status:"Available",
    shared:false

  });




  const addAsset = ()=>{


    const newAsset={

      tag:`AF-${String(assets.length+1).padStart(4,"0")}`,

      ...asset

    };


    setAssets([

      ...assets,

      newAsset

    ]);



    setAsset({

      name:"",
      category:"",
      serial:"",
      date:"",
      cost:"",
      condition:"",
      location:"",
      status:"Available",
      shared:false

    });


  };






  const filteredAssets = assets.filter(item=>

    item.tag.toLowerCase().includes(search.toLowerCase()) ||

    item.serial.toLowerCase().includes(search.toLowerCase()) ||

    item.category.toLowerCase().includes(search.toLowerCase()) ||

    item.location.toLowerCase().includes(search.toLowerCase())

  );






  return (

    <div style={{padding:"30px"}}>


      <h1>
        Asset Registration & Directory
      </h1>




      <h2>
        Register New Asset
      </h2>




      <input

        placeholder="Asset Name"

        value={asset.name}

        onChange={(e)=>setAsset({

          ...asset,

          name:e.target.value

        })}

      />



      <br/><br/>




      <input

        placeholder="Category"

        value={asset.category}

        onChange={(e)=>setAsset({

          ...asset,

          category:e.target.value

        })}

      />



      <br/><br/>




      <input

        placeholder="Serial Number"

        value={asset.serial}

        onChange={(e)=>setAsset({

          ...asset,

          serial:e.target.value

        })}

      />



      <br/><br/>




      <label>
        Acquisition Date:
      </label>


      <input

        type="date"

        value={asset.date}

        onChange={(e)=>setAsset({

          ...asset,

          date:e.target.value

        })}

      />



      <br/><br/>




      <input

        placeholder="Acquisition Cost"

        value={asset.cost}

        onChange={(e)=>setAsset({

          ...asset,

          cost:e.target.value

        })}

      />



      <br/><br/>




      <input

        placeholder="Condition"

        value={asset.condition}

        onChange={(e)=>setAsset({

          ...asset,

          condition:e.target.value

        })}

      />



      <br/><br/>




      <input

        placeholder="Location"

        value={asset.location}

        onChange={(e)=>setAsset({

          ...asset,

          location:e.target.value

        })}

      />



      <br/><br/>




      <label>

        <input

          type="checkbox"

          checked={asset.shared}

          onChange={(e)=>setAsset({

            ...asset,

            shared:e.target.checked

          })}

        />

        Shared / Bookable

      </label>



      <br/><br/>




      <button onClick={addAsset}>

        Register Asset

      </button>





      <hr/>





      <h2>
        Search Assets
      </h2>



      <input

        placeholder="Search by Tag, Serial, Category, Location"

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

      />






      <h2>
        Asset Directory
      </h2>




      <table border="1" cellPadding="10">


        <thead>

          <tr>

            <th>Asset Tag</th>
            <th>Name</th>
            <th>Category</th>
            <th>Serial</th>
            <th>Status</th>
            <th>Location</th>
            <th>Bookable</th>

          </tr>

        </thead>




        <tbody>


        {

          filteredAssets.map((item,index)=>(


            <tr key={index}>


              <td>
                {item.tag}
              </td>


              <td>
                {item.name}
              </td>


              <td>
                {item.category}
              </td>


              <td>
                {item.serial}
              </td>



              <td>

                <select

                  value={item.status}

                  onChange={(e)=>{


                    const updated=[...assets];

                    updated[index].status=e.target.value;

                    setAssets(updated);


                  }}

                >

                  <option>Available</option>
                  <option>Allocated</option>
                  <option>Reserved</option>
                  <option>Under Maintenance</option>
                  <option>Lost</option>
                  <option>Retired</option>
                  <option>Disposed</option>


                </select>


              </td>




              <td>
                {item.location}
              </td>



              <td>

                {
                  item.shared
                  ?
                  "Yes"
                  :
                  "No"
                }

              </td>



            </tr>


          ))

        }


        </tbody>


      </table>




    </div>

  );

}


export default AssetRegistration;