interface ButtonProps {
	size: 'small' | 'medium' | 'large'
	type: 'primary' | 'secondary'
	text?: string
	icon?: 'add' | 'question'
	onClick: () => void;
}

function Button(props: ButtonProps) {

	const sizeClass = props.size === 'small' ? 'text-sm rounded-md' : props.size === 'medium' ? 'text-base rounded-lg' : 'text-lg rounded-xl'
	const typeClass =
		props.type === 'primary' ? 'bg-green-400 hover:bg-green-500 focus:outline-green-500 active:bg-green-600' :
		props.type === 'secondary' ? 'bg-pink-400 hover:bg-pink-500 focus:outline-pink-500 active:bg-pink-600' :
		null;

	return (
		<button onClick={props.onClick} className={`${sizeClass} ${typeClass} py-1 px-2 w-fit focus:outline-2 focus:outline-offset-2`}>
			<p className={'uppercase'}>{props.text && props.text}{props.icon && props.icon}</p>
		</button>
	)
}

export default Button;