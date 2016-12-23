/**
 * list to use with select lists, to keep identifiers of selected objects
 */
export class SelectList<T> {
    public list: T[];


    public constructor() {
        this.list = [];
    }

    /**
     * toggle element selection
     * @param event
     */
    public toggleElem = (event) => {
        if (event.target.checked) {
            this.addElem(event.target.value);
        } else {
            this.removeElem(event.target.value);
        }
    };

    public addElem = (elem: T) => {
        if (this.list.indexOf(elem) === -1) {
            this.list.push(elem);
        }
    };

    public removeElem = (elem: T) => {
        let index = this.list.indexOf(elem);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    };

    /**
     * use it in checkbox's [checked] attr to keep state of checkbox in sync with external changes
     * to the array
     *
     * @example
     * <pre>// .js
     *     class ExampleComponent {
     *          this.selectedItems: SelectList<string>;
     *     }
     *
     *     //.html
     *     &lt;input type=&quot;checkbox&quot; name=&quot;exampleName&quot;
     *          [checked]=&quot;this.selectedItems.isOnList(value)&quot; value=&quot;value&quot;&gt;
     * </pre>
     *
     * @param elem
     * @returns {boolean}
     */
    public isOnList = (elem: T) => {
        return this.list.indexOf(elem) !== -1;
    };

    public toggleSelectAll = (event, elemsArray: T[]) => {
        if (event.target.checked) {
            this.selectElems(elemsArray);
        } else {
            this.clearElems();
        }
    };

    public selectElems = (elems: T[]) => {
        elems.forEach(elem => this.addElem(elem));
    };

    public clearElems = () => {
        this.list.splice(0);
    }
}
