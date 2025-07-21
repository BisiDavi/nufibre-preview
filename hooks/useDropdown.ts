import React, { useState } from "react";

export default function useDropdown() {
    const [dropdown, setDropdown] = useState(false);

    function openDropdown() {
        setDropdown(true);
    }

    function closeDropdown() {
        setDropdown(false);
    }

    return {
        dropdown,
        openDropdown,
        closeDropdown,
    };
}
