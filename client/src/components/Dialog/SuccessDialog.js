import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function SuccessDialog({ title = 'Successful', onAccept }) {
    return (
        <div className="flex justify-center items-center z-[9999] fixed inset-0">
            <div className="overlay fixed inset-0 bg-black opacity-40 cursor-pointer" onClick={() => onAccept()}></div>
            <div className="bg-white min-h-[200px] w-[300px] p-8 rounded-xl z-[999] text-center">
                <div className="text-green-700 text-7xl mt-8">
                    <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <div className="my-4 text-4xl mb-8">{title}</div>
                <div className="flex justify-center items-center text-[20px]">
                    <Button className="text-green-600" onClick={onAccept}>
                        OK
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SuccessDialog;
