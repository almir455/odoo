import { useState } from "react";

function Organization() {

  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);


  const [department, setDepartment] = useState({
    name: "",
    head: "",
    parent: "",
    status: "Active"
  });


  const [category, setCategory] = useState({
    name: "",
    fields: "",
    status: "Active"
  });


  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    role: "Employee",
    status: "Active"
  });



  const addDepartment = () => {

    setDepartments([...departments, department]);

    setDepartment({
      name:"",
      head:"",
      parent:"",
      status:"Active"
    });

  };



  const addCategory = () => {

    setCategories([...categories, category]);

    setCategory({
      name:"",
      fields:"",
      status:"Active"
    });

  };



  const addEmployee = () => {

    setEmployees([...employees, employee]);

    setEmployee({
      name:"",
      email:"",
      department:"",
      role:"Employee",
      status:"Active"
    });

  };



  return (

    <div style={{padding:"30px"}}>


      <h1>Organization Setup (Admin)</h1>



      {/* Department Management */}

      <h2>Department Management</h2>


      <input
        placeholder="Department Name"
        value={department.name}
        onChange={(e)=>setDepartment({
          ...department,
          name:e.target.value
        })}
      />


      <input
        placeholder="Department Head"
        value={department.head}
        onChange={(e)=>setDepartment({
          ...department,
          head:e.target.value
        })}
      />


      <input
        placeholder="Parent Department"
        value={department.parent}
        onChange={(e)=>setDepartment({
          ...department,
          parent:e.target.value
        })}
      />


      <button onClick={addDepartment}>
        Create Department
      </button>



      <table border="1" cellPadding="10">

        <tbody>

          <tr>
            <th>Name</th>
            <th>Head</th>
            <th>Parent</th>
            <th>Status</th>
          </tr>


          {
            departments.map((d,index)=>(

              <tr key={index}>
                <td>{d.name}</td>
                <td>{d.head}</td>
                <td>{d.parent}</td>
                <td>{d.status}</td>
              </tr>

            ))
          }


        </tbody>

      </table>





      <hr/>




      {/* Asset Category */}


      <h2>Asset Category Management</h2>


      <input
        placeholder="Category Name"
        value={category.name}
        onChange={(e)=>setCategory({
          ...category,
          name:e.target.value
        })}
      />


      <input
        placeholder="Category Specific Field"
        value={category.fields}
        onChange={(e)=>setCategory({
          ...category,
          fields:e.target.value
        })}
      />


      <button onClick={addCategory}>
        Create Category
      </button>



      <table border="1" cellPadding="10">

        <tbody>

          <tr>
            <th>Category</th>
            <th>Extra Fields</th>
            <th>Status</th>
          </tr>


          {
            categories.map((c,index)=>(

              <tr key={index}>
                <td>{c.name}</td>
                <td>{c.fields}</td>
                <td>{c.status}</td>
              </tr>

            ))
          }


        </tbody>

      </table>






      <hr/>





      {/* Employee Directory */}


      <h2>Employee Directory</h2>


      <input
        placeholder="Employee Name"
        value={employee.name}
        onChange={(e)=>setEmployee({
          ...employee,
          name:e.target.value
        })}
      />


      <input
        placeholder="Email"
        value={employee.email}
        onChange={(e)=>setEmployee({
          ...employee,
          email:e.target.value
        })}
      />


      <input
        placeholder="Department"
        value={employee.department}
        onChange={(e)=>setEmployee({
          ...employee,
          department:e.target.value
        })}
      />



      <select
        value={employee.role}
        onChange={(e)=>setEmployee({
          ...employee,
          role:e.target.value
        })}
      >

        <option>Employee</option>
        <option>Department Head</option>
        <option>Asset Manager</option>

      </select>



      <button onClick={addEmployee}>
        Add Employee
      </button>





      <table border="1" cellPadding="10">

        <tbody>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
          </tr>


          {
            employees.map((e,index)=>(

              <tr key={index}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>{e.role}</td>
                <td>{e.status}</td>
              </tr>

            ))
          }


        </tbody>

      </table>



    </div>

  );

}


export default Organization;