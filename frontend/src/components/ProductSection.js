import HorizontalRow from "./HorizontalRow";

export default function ProductSection({ title, items, category, onSeeAll }) {

  return (
<HorizontalRow

      title={title}

      items={items}

      category={category}

      onSeeAll={onSeeAll}

    />

  );

}
 
