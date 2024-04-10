/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { login, saveLoggedInUser } from "../services/authService";
import { RegisterService } from "../services/register";

const SignIn = ({ isOpen, onClose, onLogin }) => {
  const modalRef = useRef();
  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // handle login
      login(username, password)
        .then((res) => {
          console.log(res.data);
          saveLoggedInUser(res.data.id, res.data.username);
          onLogin();
        })
        .catch((err) => {
          console.log(err);
        });


      onClose();
    } else {
      
      try {
        if (name && username && password) {                 
          const registerData = {
            name: name,
            username: username,
            password: password,
          }
          const data = await RegisterService.register(registerData);          
          console.log(data);
          login(data.username, data.password)
            .then((res) => {
              console.log(res.data);
              saveLoggedInUser(res.data.id, res.data.username);
              onLogin();
            })
            .catch((err) => {
              console.log(err);
            });
          setIsLogin(true);
          alert(data.msg) /// modal pop up mas better
        }
      } catch (error) {
        console.log(error);
        alert('try again')
      }
      
     
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="modal bg-black bg-opacity-50 w-full h-full absolute flex items-center justify-center">
        <div
          ref={modalRef}
          className="modal-content bg-white200 rounded-lg p-8 m-4 max-w-xs mx-auto"
        >
          <div className="flex justify-between">
            <h2 className="relative text-3xl w-1/2 font-medium mb-3 leading-8">
              {isLogin ? "Sign In" : "Create Account"}
            </h2>
            <img
              className="w-6 h-6 hover:cursor-pointer"
              src="https://img.icons8.com/material-rounded/24/multiply--v1.png"
              alt="multiply--v1"
              onClick={onClose}
            />
          </div>
          <p className="text-xs font-light leading-4 my-1">
            {isLogin
              ? "Sign in to Tito Zah's Kitchen to continue your culinary journey."
              : "Join Tito Zah's Kitchen to unlock a world of culinary creativity. Sign up now to add, share, and savor delicious recipes for every mealtime delight."}
          </p>
          <form className="my-4" onSubmit={handleFormSubmit}>
            {/* Form fields */}
            {!isLogin && (
              <input
                className="w-full p-2 rounded-lg mb-2 text-sm"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            )}
            <input
              className="w-full p-2 rounded-lg mb-2 text-sm"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              className="w-full p-2 rounded-lg mb-2 text-sm"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="submit"
              className="w-full h-8 rounded-3xl bg-green text-white200 mt-2"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>
          <a
            className="flex justify-center text-sm text-gray"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default SignIn;
