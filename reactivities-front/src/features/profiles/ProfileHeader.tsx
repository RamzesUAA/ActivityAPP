import React from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
interface Props {
  profile: Profile;
}
const ProfileHeader = ({ profile }: Props) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile.image || `/assets/user.png`}
              ></Item.Image>
              <Item.Content verticalAlign="middle">
                <Header as="h1" content={profile.displayName}></Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label="Followers" value="5"></Statistic>
            <Statistic label="Following" value="42"></Statistic>
          </Statistic.Group>
          <Divider />
          <Reveal animated="move">
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button fluid color="teal" content="Following"></Button>
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: "100%" }}>
              <Button
                fluid
                color={true ? "red" : "green"}
                content={true ? "Unfollow" : "Follow"}
              ></Button>
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
