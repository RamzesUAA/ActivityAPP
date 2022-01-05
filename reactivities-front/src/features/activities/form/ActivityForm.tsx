import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

const ActivityForm = () => {
  const history = useHistory();
  const { activityStore } = useStore();
  const { loadActivity, loading, createActivity, updateActivity } =
    activityStore;
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleSubmit = () => {
    if (activity.id?.length === 0) {
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  if (loading) return <LoadingComponent content="Loading activity..." />;
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          name="title"
          value={activity.title}
          onChange={handleInputChange}
        ></Form.Input>
        <Form.TextArea
          placeholder="Description"
          name="description"
          value={activity.description}
          onChange={handleInputChange}
        ></Form.TextArea>
        <Form.Input
          placeholder="Categoty"
          name="category"
          value={activity.category}
          onChange={handleInputChange}
        ></Form.Input>
        <Form.Input
          placeholder="Date"
          name="date"
          type="date"
          value={activity.date}
          onChange={handleInputChange}
        ></Form.Input>
        <Form.Input
          placeholder="City"
          name="city"
          value={activity.city}
          onChange={handleInputChange}
        ></Form.Input>
        <Form.Input
          placeholder="Vanue"
          name="venue"
          value={activity.venue}
          onChange={handleInputChange}
        ></Form.Input>
        <Button
          floated="right"
          loading={loading}
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
    </Segment>
  );
};

export default observer(ActivityForm);
