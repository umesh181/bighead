'use client';
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

export function HeaderActions() {
  return (
    <>
      <Unauthenticated>
        <div
          style={{
            display: 'inline-block',
            border: '1px solid #ffe733',
            borderRadius: '5px',
            padding: '8px 16px',
            cursor: 'pointer',
            transition: 'background-color 0.2s, color 0.2s',
            color: 'white', // Text color when not hovered
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffe733';
            e.currentTarget.style.color = 'black'; // Text color when hovered
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'white'; // Reset text color
          }}
        >
          <SignInButton />
        </div>
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
      <AuthLoading>Loading...</AuthLoading>
    </>
  );
}
