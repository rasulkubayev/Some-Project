import {useState, useEffect} from 'react';
import {signin, autheticate, isAuth} from '../../actions/auth';
import Router from 'next/router';


const SigninComponent = () => {
    const [values, setValues] = useState({
        email: 'ryan@gmail.com',
        password: 'rrrrrr',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });


     const { email, password, error, loading, message, showForm} = values;

      useEffect(() => {
           isAuth() && Router.push(`/`);  
      }, []);

   const handleSubmit = (e) => {
        e.preventDefault()
      //  console.table({name, email, password, error, loading, message, showForm});

        setValues({...values, loading: true, error: false});
        const user = { email, password}

        signin(user).then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, loading: false});
                }
                else {
                    //sae user token
                    autheticate(data, () => {
                        if(isAuth() && isAuth().role === 1) {
                            Router.push('/admin');
                        } else {
                            Router.push('/user');
                        }
                    })

                    
                }
        });
            
        };

   

   const handleChange = props => e => {
    setValues({...values, error: false, [props]: e.target.value})
}


  const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
  const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
  const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');


   const signinForm = () => {
       return (
           <React.Fragment>
             <form onSubmit={handleSubmit}>
        
           <div className="form-group">               
                 <input value={email} onChange={handleChange('email')} type="email" name="" id="" className="form-control" placeholder="Type your email" />               
           </div>

           <div className="form-group">               
                 <input value={password} onChange={handleChange('password')} type="password" name="" id="" className="form-control" placeholder="Type your password" />               
           </div>

           <div>
           <button className="btn btn-primary">Signin</button>
           </div>
           
           </form>
           </React.Fragment>
           
       )
   }
    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </React.Fragment>
    )
};

export default SigninComponent;



