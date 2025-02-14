interface PanelProps {
	panelColor: string;
}

function Panel(props: PanelProps) {


	return (
		<div className= {props.panelColor}>Hello from Panel</div>
	)
}

export default Panel;