import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Segment, Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity, ActivityFormValues } from "../../../app/models/activity";

const ActivityForm = () => {
  const history = useHistory();
  const { activityStore } = useStore();
  const { loadActivity, loading, createActivity, updateActivity } =
    activityStore;
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("Date is required").nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) =>
        setActivity(new ActivityFormValues(activity))
      );
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: ActivityFormValues) => {
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  // const handleChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setActivity({ ...activity, [name]: value });
  // };

  if (loading) return <LoadingComponent content="Loading activity..." />;
  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal"></Header>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Titel"></MyTextInput>
            <MyTextArea
              rows={3}
              placeholder="Description"
              name="description"
            ></MyTextArea>
            <MySelectInput
              options={categoryOptions}
              placeholder="Categoty"
              name="category"
            ></MySelectInput>
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            ></MyDateInput>
            <Header content="Location Details" sub color="teal"></Header>
            <MyTextInput placeholder="City" name="city"></MyTextInput>
            <MyTextInput placeholder="Venue" name="venue"></MyTextInput>
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              floated="right"
              loading={isSubmitting}
              positive
              type="submit"
              content="Submit"
            ></Button>
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            ></Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
