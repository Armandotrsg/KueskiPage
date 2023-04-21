export const Checkbox = ({ isChecked, setIsChecked }) => {
    return (
        <>
            <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                <span>
                    <em></em>
                </span>
            </label>
        </>
    );
};
