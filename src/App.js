import "./styles.css";
import { useState } from "react";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

export default function App() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      alert(" login successfull");
    },
    validate: (values) => {
      const emaildefault = /^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/i;
      const passworddefault = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
      let errors = {};
      {
        !values.name
          ? (errors.name = "Required Name")
          : values.name.length > 15
          ? (errors.name = "Must be 15 characters or less")
          : null;
      }
      {
        !values.email
          ? (errors.email = "Required Email")
          : !emaildefault.test(values.email)
          ? (errors.email = "please enter a valid email")
          : null;
      }
      {
        !values.password
          ? (errors.password = "Required password")
          : !passworddefault.test(values.password)
          ? (errors.password =
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
          : null;
      }
      return errors;
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          id="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <div>{formik.errors ? formik.errors.name : null}</div>
      </div>
      <div>
        <label>Email......:</label>
        <input
          id="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <div>{formik.errors ? formik.errors.email : null}</div>
      </div>
      <div>
        <label>password.:</label>
        <input
          id="password"
          type={passwordShown ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <i onClick={togglePasswordVisiblity}>{eye}</i>
        <div>{formik.errors ? formik.errors.password : null}</div>
      </div>
      <button type="submit">submit</button>
    </form>
  );
}
