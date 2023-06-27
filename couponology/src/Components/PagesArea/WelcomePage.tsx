export function WelcomePage() {
    return <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }}>
        <h1> Welcome to Coupon System  </h1>
        <h3>The system is designed to manage a coupon service.</h3>
        <p>
            The admin will create the customers and companies.
            <br />
            The companies will create the coupons.
            <br />
            The customers will purchase the coupons.
        </p>
        <img src="https://y.yarn.co/8eff6631-7e77-4bd9-adb7-adfa047ae922_text.gif" alt="Welcome" />
    </div>
}