import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';


const App = () => {

  useEffect(() => {
    alert("This is not a secured page don't use your actual credentials");
    fetchdata();
  }, []);

  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [dataList, setDataList] = useState([]);
  const [isedit, setisedit] = useState(false);
  const [editid, seteditid] = useState('');

  const fetchdata = async () => {
    try {
      const res = await axios.get('https://crud-backend-bvp5.onrender.com/crud');
      setDataList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlesubmit = async () => {
    if (!fname || !lname || !email || !phone) {
      alert('Please fill all the details');
      return;
    }

    try {
      if (isedit) {
        await axios.put(`https://crud-backend-bvp5.onrender.com/crud/${editid}`, {
          fname, lname, email, phone
        });
        setisedit(false);
        seteditid('');
         fetchdata();
                 setfname('');
        setlname('');
        setemail('');
        setphone('');
      } else {
        await axios.post('https://crud-backend-bvp5.onrender.com/crud', {
          fname, lname, email, phone
        });
          
        setfname('');
        setlname('');
        setemail('');
        setphone('');
     fetchdata();
      }
    } catch (error) {
      console.error(error);
      alert('Unable to submit data');
    }
  }

  const updatefn = (item) => {
    setfname(item.fname),
      setlname(item.lname),
      setemail(item.email),
      setphone(item.phone),
      setisedit(true),
      seteditid(item._id)
  }

  const deletefn = async (id) => {
    try {
      await axios.delete(`https://crud-backend-bvp5.onrender.com/crud/${id}`);
      fetchdata();
      //  alert('deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Unable to delete Data')
    }
  }

  return (
    <>

      <h2 className='text-center text-white bg-primary p-3'>Crud Page</h2>
      
      {/* input field */}
      
      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h4>crud input</h4>
              <div className="row">
                <div className="col-6 mb-2">
                  <label>First Name</label>
                  <input type="text" className='form-control' value={fname} onChange={(e) => setfname(e.target.value)} />
                </div>
                <div className="col-6 mb-2">
                  <label>Last Name</label>
                  <input type="text" className='form-control' value={lname} onChange={(e) => setlname(e.target.value)} />
                </div>
                <div className="col-6 mb-2">
                  <label>Email</label>
                  <input type="email" className='form-control' value={email} onChange={(e) => setemail(e.target.value)} />
                </div>
                <div className="col-6 mb-2">
                  <label>Phone</label>
                  <input type="text" className='form-control' value={phone} onChange={(e) => setphone(e.target.value)} />
                </div>
                <div className="col">
                  <button className='btn btn-primary align-item-center' onClick={handlesubmit}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* table field */}
        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList.map((item, index) => (
                    <tr key={item._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.fname}</td>
                      <td>{item.lname}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className='btn btn-warning btn-sm' onClick={() => updatefn(item)}>Update</button>
                          <button className='btn btn-danger btn-sm' onClick={() => deletefn(item._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
