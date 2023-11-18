import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import {ToastContainer, toast, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './_form.scss';

export default function RegistrationForm() {
	
	const RegistrationSchema = Yup.object().shape({
		userName: Yup.string()
			.min(2, 'Too Short!')
			.max(20, 'Too Long!')
			.required('Required'),
		
		userEmail: Yup.string()
			.email('Invalid email')
			.required('Required'),
		
		userPhoneNumber: Yup.string()
			.matches(/^(\+38)?\s?0\d{9}$/, 'Invalid phone number')
			.required('Required'),
	});
	
	const handleSubmit = (values, { resetForm }) => {
		toast.success('Submitted', {
			autoClose: 1300,
			transition: Flip,
		})
		
		resetForm();
	}
	
	return(
		<>
			<Formik
				initialValues={{
					userName: '',
					userEmail: '',
					userPhoneNumber: '+380',
				}}
				validationSchema={RegistrationSchema}
				onSubmit={handleSubmit}
			>
				{({ errors, touched }) => (
					<Form className='form'>
						
						<div className='form__title'>
							Registration
						</div>
						
						<div className="form__row">
							<Field
								className={classNames('form__item', { 'invalid': errors.userName && touched.userName })}
								id='userName'
								name='userName'
								placeholder='Your name'
							/>
							{errors.userName && touched.userName ? (
								<div className='form__error'>{errors.userName}</div>
							) : null}
						</div>
						
						<div className="form__row">
							<Field
								className={classNames('form__item', { 'invalid': errors.userEmail && touched.userEmail })}
								type='email'
								id='userEmail'
								name='userEmail'
								placeholder='Your email'
							/>
							{errors.userEmail && touched.userEmail ? (
								<div className='form__error'>{errors.userEmail}</div>
							) : null}
						</div>
						
						<div className="form__row">
							<Field
								className={classNames('form__item', { 'invalid': errors.userPhoneNumber && touched.userPhoneNumber })}
								id='userPhoneNumber'
								name='userPhoneNumber'
								placeholder='Your phone number'
							/>
							{errors.userPhoneNumber && touched.userPhoneNumber ? (
								<div className='form__error'>{errors.userPhoneNumber}</div>
							) : null}
						</div>
						
						<button
							className='form__btn'
							type='submit'
						>
							Submit
						</button>
					
					</Form>
				)}
				
			</Formik>
			
			<ToastContainer />
		</>
	);
}