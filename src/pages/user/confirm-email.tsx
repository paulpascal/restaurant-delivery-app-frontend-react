import { useApolloClient, useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router";
import { useMe } from "../../hooks/useMe";
import { VerifyEmailInput } from "../../__generated__/globalTypes";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;
export const ConfirmEmail = () => {
  const { data: userData } = useMe();

  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id + ""}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: { verified: true },
      });
    }
  };

  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    { onCompleted }
  );

  const client = useApolloClient();
  const history = useHistory();

  React.useEffect(() => {
    const [, code] = window.location.href.split("code=");
    verifyEmail({ variables: { input: { code } } });
  }, []);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title>Verify Email | Delivery app</title>
      </Helmet>
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
