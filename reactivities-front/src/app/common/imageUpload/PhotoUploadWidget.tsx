import { useEffect, useState } from "react";
import { Grid, Header, Button } from "semantic-ui-react";
import PhotoWidgerDropzone from "./PhotoWidgerDropzone";
import PhotoWodgetCropper from "./PhotoWidgetCropper";

interface Props {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

const PhotoUploadWidget = ({ loading, uploadPhoto }: Props) => {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 1 - Add Photo" />
        <PhotoWidgerDropzone setFiles={setFiles}></PhotoWidgerDropzone>
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 2 - Resize image" />
        {files && files.length > 0 && (
          <PhotoWodgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 3 - Preview & Upload" />
        <>
          <div
            className="img-preview"
            style={{ minHeight: 200, overflow: "hidden" }}
          />
          {files && files.length > 0 && (
            <Button.Group widths={2}>
              <Button
                loading={loading}
                onClick={onCrop}
                positive
                icon="check"
              />
              <Button
                disabled={loading}
                onClick={() => setFiles([])}
                icon="close"
              />
            </Button.Group>
          )}
        </>
      </Grid.Column>
    </Grid>
  );
};

export default PhotoUploadWidget;
