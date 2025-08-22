import { ButtonProps } from "@/interfaces"


const Button: React.FC<ButtonProps> = ({ title, action }) => {
    return (
        <>
            <button onClick={action} className="btn-enhanced px-8 py-3 border-2 border-[#E2D609] text-[#E2D609] rounded-full hover:bg-[#E2D609] hover:text-black transition-all duration-300 font-semibold">
                {title}
            </button>
        </>
    )
}

export default Button