import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

const ActivityList = () => {
  const { activityStore } = useStore();

  const { deleteActivity, activitiesByDate, loading } = activityStore;

  const [target, setTraget] = useState("");

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTraget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <Segment>
      <Item>
        <Item.Group divided>
          {activitiesByDate.map((acitivity) => (
            <Item key={acitivity.id}>
              <Item.Content>
                <Item.Header as="a">{acitivity.title}</Item.Header>
                <Item.Meta>{acitivity.date}</Item.Meta>
                <Item.Description as="a">
                  <div>{acitivity.description}</div>
                  <div>
                    {acitivity.city}, {acitivity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    floated="right"
                    content="View"
                    color="blue"
                    as={Link}
                    to={`/activities/${acitivity.id}`}
                  ></Button>
                  <Button
                    name={acitivity.id}
                    floated="right"
                    loading={loading && target === acitivity.id}
                    content="Delete"
                    color="red"
                    onClick={(e) => handleActivityDelete(e, acitivity.id)}
                  ></Button>
                  <Label basic content={acitivity.category}></Label>
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Item>
    </Segment>
  );
};
export default observer(ActivityList);
