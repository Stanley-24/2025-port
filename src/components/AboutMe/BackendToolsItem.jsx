import { IoMdCheckmark } from "react-icons/io";

const BackendToolsItem = ({tool}) => {
    return (
        <li className="flex items-center gap-2 leading-7">
            <IoMdCheckmark /> {tool}
        </li>
    )
};

export default BackendToolsItem;