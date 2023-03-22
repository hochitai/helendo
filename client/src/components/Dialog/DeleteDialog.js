import Button from '../Button';

const DeleteDialog = ({ onClose, onAccept }) => {
    return (
        <div className="flex justify-center items-center z-[9999] fixed inset-0">
            <div className="overlay fixed inset-0 bg-black opacity-40 cursor-pointer" onClick={() => onClose()}></div>
            <div className="bg-white h-[160px] w-[400px] p-8 rounded-xl z-[999]">
                <div className="text-red-700 text-4xl">Delete?</div>
                <div className="my-4 text-3xl">Are you sure to delete it?</div>
                <div className="flex justify-end items-center">
                    <Button onClick={() => onClose()}>No</Button>
                    <Button className="text-red-600" onClick={onAccept}>
                        Yes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDialog;
