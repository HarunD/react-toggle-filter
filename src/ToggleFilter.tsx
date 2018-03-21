/*
    TODO:
    - possibility to send objects as ItemList, eg. [{title: 'Active', status: 0}, {title: 'Closed', status: 1}]
*/
import React from 'react';

import './style.css';

interface FilterableItem {
    title : string,
    isSelected : boolean
}
type FilterableList = Array < FilterableItem > | null;
type ItemList = Array < string >;

interface ToggleFilterProps {
    className?: string;
    items : ItemList;
    itemClassName?: string;
    onItemToggle : Function;
    selected : ItemList;
    style?: object;
}

interface ToggleFilterState {
    filterableItems : FilterableList;
}

export default class ToggleFilter extends React.Component < ToggleFilterProps,
ToggleFilterState > {
    public static defaultProps : Partial < ToggleFilterProps > = {
        items: [],
        selected: []
    }

    constructor(props : ToggleFilterProps) {
        super(props);
        this.state = {
            filterableItems: this._getFilterableItems(props.items, props.selected)
        };
    }

    componentDidUpdate(prevProps : any, prevState : any) {
        this._fireToggle(this.state.filterableItems);
    }

    // Fire the update event
    _fireToggle = (filterableItems : FilterableList) => {
        let selectedItems : ItemList = [];

        if (filterableItems && filterableItems.length > 0) {
            selectedItems = filterableItems.filter((item : FilterableItem) => item.isSelected).map((item : FilterableItem) => item.title);
        }

        this
            .props
            .onItemToggle(selectedItems, filterableItems);
    }

    // Create an object of provided filterable items
    _getFilterableItems = (allItems : ItemList, selectedItems : ItemList) : FilterableList | null => {
        if (!allItems || allItems.length === 0) {
            return null;
        }

        let filterable : Array < FilterableItem > = [];
        allItems.forEach((i : string) => {
            filterable.push({
                title: i,
                isSelected: selectedItems.includes(i)
            });
        });

        return filterable;
    }

    // Toggle the isSelected state of an item
    _toggleItem = (index : number, item : FilterableItem) => {
        let filterableItems : FilterableList = this.state.filterableItems;
        if (!filterableItems) {
            return;
        }

        filterableItems[index].isSelected = !item.isSelected;
        this.setState({filterableItems});
    }

    render() {
        let filterableItems : FilterableList = this.state.filterableItems;

        if (!filterableItems) {
            return null;
        }

        let {className, style, itemClassName} = this.props;

        return (
            <section
                className={`ToggleFilter ${className
                ? className
                : ''}`}
                style={style}>
                {filterableItems.map((item : FilterableItem, index : number) => (
                    <span
                        key={index}
                        className={`ToggleFilter__Item ${itemClassName
                        ? itemClassName
                        : ''} ${item.isSelected
                            ? '--is-selected'
                            : ''}`}
                        onClick={() => this._toggleItem(index, item)}>{item.title}</span>
                ))}
            </section>
        );
    }
}