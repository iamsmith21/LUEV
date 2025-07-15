import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseAuth from "../contexts/UseAuth";
function Login() {
  const [login, setLogin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });

  const navigate = useNavigate();
  const { setUser } = UseAuth();

  const handleClick = () => {
    setLogin(!login);

    setForm({
      email: "",
      password: "",
      confirm: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login && form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const endpoint = login ? "/login" : "/register";
      const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          login ? { email: form.email, password: form.password } : form
        ),
      });

      const data = await res.json();

      if (res.ok) {
        if (login) {
          setUser(data.user);
          alert("Logged in!");
          navigate("/");
        } else {
          alert("Registered!");
          handleClick();
        }
      } else {
        alert(data.error || "Error");
      }
    } catch (error) {
      console.log("server error", error);
      alert("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-64 mt-20 w-full flex items-center justify-center">
      <div className="flex flex-col gap-2 justify-center border rounded p-5">
        {" "}
        <div>
          {" "}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="px-2 py-1 border radius w-full"
            required
          />
        </div>
        <div>
          {" "}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="px-2 py-1 border radius w-full"
            required
          />
        </div>
        {!login && (
          <>
            <div>
              {" "}
              <label htmlFor="confirm">Confirm Password:</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="px-2 py-1 border radius w-full"
                required
              />
            </div>

            <div>
              {" "}
              <label htmlFor="firstname">First Name:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="px-2 py-1 border radius w-full"
                required
              />
            </div>

            <div>
              {" "}
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="px-2 py-1 border radius w-full"
                required
              />
            </div>

            <div>
              {" "}
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
                placeholder="Enter 10-digit number"
                className="px-2 py-1 border radius w-full"
                required
              />
            </div>
          </>
        )}
        <div>
          {" "}
          <button type="submit" className="w-full px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded my-2">{login ? "Login" : "Register"}</button>
        </div>
        <div>
          {" "}
          <button type="button" onClick={handleClick} className="w-full px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded">
            {login ? "Create My Account" : "Back to Login"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
