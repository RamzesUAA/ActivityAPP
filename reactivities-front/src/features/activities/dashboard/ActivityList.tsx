import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}
const ActivityList = ({
  activities,
  selectActivity,
  deleteActivity,
}: Props) => {
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
                    floated="right"
                    content="Delete"
                    color="red"
                    onClick={() => deleteActivity(acitivity.id)}
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
