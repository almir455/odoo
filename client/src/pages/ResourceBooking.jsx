import { useState } from "react";


function ResourceBooking() {


  const [bookings,setBookings] = useState([]);


  const [booking,setBooking] = useState({

    resource:"",
    person:"",
    date:"",
    start:"",
    end:""

  });



  const [message,setMessage] = useState("");





  const checkOverlap = ()=>{


    return bookings.some(item=>

      item.resource === booking.resource &&

      item.date === booking.date &&

      (
        booking.start < item.end &&
        booking.end > item.start
      )

    );


  };






  const createBooking=()=>{


    if(checkOverlap()){


      setMessage(
        "Booking rejected: Resource already booked during this time."
      );


      return;

    }




    setBookings([

      ...bookings,

      {

        ...booking,

        status:"Upcoming"

      }

    ]);



    setMessage(
      "Booking created successfully"
    );



    setBooking({

      resource:"",
      person:"",
      date:"",
      start:"",
      end:""

    });


  };






  const cancelBooking=(index)=>{


    const updated=[...bookings];


    updated[index].status="Cancelled";


    setBookings(updated);


  };







  return (

    <div style={{padding:"30px"}}>


      <h1>
        Resource Booking Screen
      </h1>



      <h2>
        Create Booking
      </h2>



      <input

        placeholder="Resource Name (Room/Lab etc.)"

        value={booking.resource}

        onChange={(e)=>setBooking({

          ...booking,

          resource:e.target.value

        })}

      />


      <br/><br/>




      <input

        placeholder="Booked By"

        value={booking.person}

        onChange={(e)=>setBooking({

          ...booking,

          person:e.target.value

        })}

      />



      <br/><br/>




      <input

        type="date"

        value={booking.date}

        onChange={(e)=>setBooking({

          ...booking,

          date:e.target.value

        })}

      />



      <br/><br/>




      <label>
        Start Time:
      </label>


      <input

        type="time"

        value={booking.start}

        onChange={(e)=>setBooking({

          ...booking,

          start:e.target.value

        })}

      />



      <br/><br/>




      <label>
        End Time:
      </label>


      <input

        type="time"

        value={booking.end}

        onChange={(e)=>setBooking({

          ...booking,

          end:e.target.value

        })}

      />



      <br/><br/>




      <button onClick={createBooking}>

        Book Resource

      </button>



      <p>
        {message}
      </p>





      <hr/>





      <h2>
        Resource Calendar
      </h2>



      <table border="1" cellPadding="10">


        <thead>

          <tr>

            <th>Resource</th>
            <th>User</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>

          </tr>


        </thead>




        <tbody>


        {

          bookings.map((item,index)=>(


            <tr key={index}>


              <td>
                {item.resource}
              </td>


              <td>
                {item.person}
              </td>


              <td>
                {item.date}
              </td>


              <td>
                {item.start} - {item.end}
              </td>


              <td>
                {item.status}
              </td>



              <td>


                <button

                  onClick={()=>cancelBooking(index)}

                >

                  Cancel

                </button>


              </td>


            </tr>


          ))

        }


        </tbody>


      </table>





      <hr/>





      <h2>
        Booking Status
      </h2>


      <ul>

        <li>Upcoming - Slot is scheduled</li>

        <li>Ongoing - Current active booking</li>

        <li>Completed - Booking finished</li>

        <li>Cancelled - Booking removed</li>

      </ul>





      <h2>
        Reminder Notification
      </h2>


      <p>
        Reminder notification will be generated before booking starts.
      </p>



    </div>

  );

}


export default ResourceBooking;