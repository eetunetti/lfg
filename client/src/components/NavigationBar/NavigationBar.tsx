import Button from "../Button/button";

function NavigationBar() {


	return (
		<div className= 'border-b-1 p-3 flex flex-row align-middle justify-between'>
			<p className='text-2xl font-bold'>LFG</p>
			<div className='gap-1'><Button onClick={() => console.log("Hello from NavBar button")} type='primary' size='medium' text='NavBar Button'/></div>
		</div>
	)
}

export default NavigationBar;