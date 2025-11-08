import React from "react";
import COLORS  from "../data/colors";

export default function Settings({ user }) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold" style={{ color: COLORS.textMain }}>Settings</h1>

            <div className="rounded-xl p-6 shadow-sm border" style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.textMain }}>Profile Settings</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textLight }}>Name</label>
                        <input type="text" defaultValue={user?.name} className="w-full px-4 py-2 rounded-lg border outline-none focus:border-2" style={{ borderColor: COLORS.border }} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textLight }}>Email</label>
                        <input type="email" defaultValue={user?.email || "sayam@example.com"} className="w-full px-4 py-2 rounded-lg border outline-none focus:border-2" style={{ borderColor: COLORS.border }} />
                    </div>
                    <button className="px-6 py-2 rounded-lg font-medium" style={{ backgroundColor: COLORS.primary, color: 'white' }}>Save Changes</button>
                </div>
            </div>

            <div className="rounded-xl p-6 shadow-sm border" style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.textMain }}>Danger Zone</h2>
                <button className="px-6 py-2 rounded-lg font-medium" style={{ backgroundColor: COLORS.error, color: 'white' }}>Delete Account</button>
            </div>
        </div>
    );
}
