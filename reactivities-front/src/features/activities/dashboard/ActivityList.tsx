import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}
const ActivityList = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: Props) => {
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
          {activities.map((acitivity) => (
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
                    onClick={() => selectActivity(acitivity.id)}
                  ></Button>
                  <Button
                    name={acitivity.id}
                    floated="right"
                    loading={submitting && target === acitivity.id}
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
export default ActivityList;
