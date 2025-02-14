interface ButtonProps {
	size: 'small' | 'medium' | 'large'
	type: 'primary' | 'secondary'
	text?: string
	icon?: 'add' | 'question'
	onClick: () => void;
}

function Button(props: ButtonProps) {

	const sizeClass = props.size === 'small' ? 'text-sm rounded-md' : props.size === 'medium' ? 'text-md rounded-lg' : 'text-lg rounded-xl'
	const typeClass = props.type === 'primary' ? 'bg-green-500' : 'bg-red-500';
	
	const hoverClass = 'hover:bg-green-600';
	const focusClass = 'focus:outline-2 focus:outline-offset-2 focus:outline-green-600'
	const activeClass = 'active:bg-green-700'

	return (
		<button onClick={props.onClick} className={`${sizeClass} ${typeClass} ${hoverClass} ${focusClass} ${activeClass} py-1 px-2 w-fit`}>
			<p className={'uppercase'}>{props.text && props.text}{props.icon && props.icon}</p>
		</button>
	)
}

export default Button;