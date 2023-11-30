import React, {useState} from "react";

function AddPictures() {
  const [imageUrl, setImageUrl] = useState("");

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await getBase64(file);
    setImageUrl(base64);
  };

  const btnActive = () => {
    document.getElementById("default-btn").click();
  };

  return (
    <div className="flex gap-4">
      <div>
        <input
          type="file"
          id="default-btn"
          multiple="multiple"
          className="hidden"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        <div
          className="relative w-[100px] h-[100px] border rounded-lg cursor-pointer"
          onClick={() => btnActive()}
        >
          <div className="text-[25px] text-[#ccc] text-center leading-[90px] ">
            +
          </div>
          {imageUrl ? (
            <>
              <img
                className="absolute top-0 w-full h-full rounded-lg"
                src={imageUrl}
                alt="anhsanpham"
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddPictures;
