import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { supabase } from "src/supabase/client";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  // const initialize = async (email, password) => {
  //   console.log(email,password, "aa")
  //   // Evitar llamar dos veces en modo desarrollo con React.StrictMode habilitado
  //   if (initialized.current) {
  //     return;
  //   }

  //   initialized.current = true;

  //   let isAuthenticated = false;

  //   try {
  //     isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   if (isAuthenticated) {
  //     const { data, error } = await supabase
  //       .from("usuarios")
  //       .select("*")
  //       .eq("email", email)
  //       .eq("pswd", password);

  //     if (data && data.length > 0) {
  //       const user = data[0];
  //       dispatch({
  //         type: HANDLERS.INITIALIZE,
  //         payload: user,
  //       });
  //     } else {
  //       dispatch({
  //         type: HANDLERS.INITIALIZE,
  //       });
  //     }
  //   }
  // };

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    console.log(isAuthenticated, "aaaa");

    if (isAuthenticated) {
      const email = window.sessionStorage.getItem("email");
      const password = window.sessionStorage.getItem("password");

      if (email && password) {
        // Utilizar el correo electrónico y la contraseña guardados para la autenticación
        const { data, error } = await supabase
          .from("usuarios")
          .select("*")
          .eq("email", email)
          .eq("pswd", password);

        if (data && data.length > 0) {
          const user = data[0];
          dispatch({
            type: HANDLERS.INITIALIZE,
            payload: user,
          });
        } else {
          dispatch({
            type: HANDLERS.INITIALIZE,
          });
        }
      } else {
        // Manejar el caso en el que el correo electrónico o la contraseña son null
        console.error(
          "El correo electrónico o la contraseña no están definidos en el sessionStorage"
        );
      }

      // dispatch({
      //   type: HANDLERS.INITIALIZE,
      //   payload: user,
      // });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {};

  const signIn = async (email, password) => {
    console.log(email, password, "eee");
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", email)
      .eq("pswd", password);

    if (data.length > 0) {
      const user = data[0]; // Obtener el primer usuario que coincida con el email y contraseña

      try {
        window.sessionStorage.setItem("authenticated", "true");
        window.sessionStorage.setItem("email", email); // Guardar el correo electrónico
        window.sessionStorage.setItem("password", password);
      } catch (err) {
        console.error(err);
      }

      console.log(state, initialState, "que viene?");
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    } else {
      throw new Error("Por favor, verifique su correo electrónico y contraseña");
    }
  };

  // const signIn = async (email, password) => {
  //   // if (email !== 'demo@devias.io' || password !== 'Password123!') {
  //   //   throw new Error('Please check your email and password');
  //   // }

  //   const { data, error } = await supabase
  //     .from("usuarios")
  //     .select("*")
  //     .eq("email", email)
  //     .eq("pswd", password);

  //   if (data.length > 0) {
  //     try {
  //       window.sessionStorage.setItem("authenticated", "true");
  //     } catch (err) {
  //       console.error(err);
  //     }

  //     const user = {
  //       id: "5e86809283e28b96d2d38537",
  //       avatar: "/assets/avatars/avatar-anika-visser.png",
  //       name: "Anika Visser",
  //       email: "anika.visser@devias.io",
  //     };

  //     dispatch({
  //       type: HANDLERS.SIGN_IN,
  //       payload: user,
  //     });
  //   } else {
  //     throw new Error("Please check your email and password");
  //   }
  // };

  const signUp = async (email, name, password) => {
    try {
      resultado = await supabase.auth.signInWithOtp({
        email: email,
      });

      console.log(email, password, "sinuo");
      signIn(email, password);
    } catch (error) {
      console.log("error", error);
      throw new Error("Please check your email and password");
    }

    throw new Error("Sign up is not implemented");
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
