import React from "react";
import { Link } from "react-router-dom";
import { Header, Icon, Segment } from "semantic-ui-react";

export const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - we've looked everywhere and could not find this.
      </Header>
      <Segment.Inline as={Link} to="/activities" primary>
        Return to activities page
      </Segment.Inline>
    </Segment>
  );
};
