import React, { useState } from 'react'
import Sidebar from '../../components/dashboard/shared/Sidebar'
import DashboardNavbar from '../../components/dashboard/shared/DashboardNavbar'
import Overview from '../../components/dashboard/shared/Overview'
import { useNavigate } from "react-router-dom";


const Notification = () => {
  
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear field-specific error when user starts typing
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
  };

  const validateFormClientSide = () => {
    const errors = {};
    if (!formData.username.trim()) errors.username = 'Username or email is required';
    if (!formData.password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");
    setFieldErrors({});

    // ✅ Run client-side validation
    const errors = validateFormClientSide();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await adminSignin({
        username: formData.username, // can also be email
        password: formData.password,
      });

      console.log("Login response data:", response.data);

      
      if(response.status == 200) navigate("/dashboard"); 
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };


  return (
	<div className='bg-gray-100 flex max-h-full'>
        <Sidebar />

        <div className='flex-1 space-y-8 p-4 mb-5 w-[80%]'>
            <DashboardNavbar title="Notifications"/>
            <div className='grid grid-cols-5 grid-rows-4 gap-4'>
                <div className="py-6 px-4 bg-white rounded-2xl col-span-3 row-span-2"
                    style={{ maxHeight: "520px", minHeight: "400px" }}>
                    <div className="flex justify-between mb-3">
                        <h2 className="font-bold text-secondaryLight text-[23px] "> Send Notification</h2>
                        <div className="flex space-x-2 mt-5">
                        
                        </div>
                    </div>
                    <div style={{ maxHeight: "520px", minHeight: "400px" }}>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <input
                                type="text"
                                id="username"
                                name="username"
                                className={`w-full py-3 px-3`}
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                required
                                disabled={isLoading}
                                />
                            </div>
                            <br/>
                            <div>
                                <div className="relative">
                                <textarea
                                    id="message"
                                    name="message"
                                    className={`w-full py-3 px-3`}
                                    value={formData.password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                                </div>
                                
                            </div>
                            <button
                                type="submit"
                                className={`w-full py-3 bg-primary text-white text-lg font-semibold rounded-md hover:bg-yellow-500 ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send Notification'}
                            </button>
                        </form>
                    </div>
                </div>
                
            {/* </div>
            <div className='grid grid-cols-3 gap-4'> */}
                <div className="py-6 px-4 bg-white rounded-2xl col-span-5 row-span-2"
                    style={{ maxHeight: "520px", minHeight: "400px" }}>
                    <div className="flex justify-between mb-3">
                        <h2 className="font-bold text-secondaryLight text-[23px] "> Notifications Lists</h2>
                        <div className="flex space-x-2 mt-5">
                        
                        </div>
                    </div>
                    <div style={{ maxHeight: "520px", minHeight: "400px" }}>
                        <div>
          <Transactions
            title="Recent Transactions"
            columns={[
              { header: "Transaction ID", key: "transaction_id" },
              {
                header: "Customer",
                key: "user",
                render: (user) =>
                  `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() || user?.username
              },
              { header: "Amount", key: "amount", 
                render:(value) => formatAmount(value)
              },
              { header: "Description", key: "provider", render: (provider) => `${provider?.name}`},
              {
                header: "Status",
                key: "status",
                render: (value) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      value === "Successful"
                        ? "bg-green-200 text-green-800"
                        : value === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {value}
                  </span>
                ),
              },
              { header: "Date | Time", key: "created_at", render: (value) => formatDate(value)},
            ]}
            data={dashboardData.recent_transactions.length > 0 ? dashboardData.recent_transactions : []}
          />
        </div>

                    </div>
                </div>
                
            </div>
        </div>
      
    </div>
  )
}

export default Notification;
