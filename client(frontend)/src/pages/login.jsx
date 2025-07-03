import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
          alert("Logged in!");
          navigate("/");
        } else {
          alert("Registered!");
          handleClick()
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter your email address"
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter your password"
        required
      />

      {!login && (
        <>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
          />

          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />

          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />

          <label htmlFor="mobile">Mobile:</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            pattern="[0-9]{10}"
            placeholder="Enter 10-digit number"
            required
          />
        </>
      )}

      <button type="submit">{login ? "Login" : "Register"}</button>

      <button type="button" onClick={handleClick}>
        {login ? "Create My Account" : "Back to Login"}
      </button>
    </form>
  );
}

export default Login;
